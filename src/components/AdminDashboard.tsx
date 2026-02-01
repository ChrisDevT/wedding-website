import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { Lock, Users, UserCheck, UserX, Download, Image, Trash2, LogOut } from 'lucide-react';

interface RSVP {
  id: string;
  guest_name: string;
  email: string;
  phone: string | null;
  attending: boolean;
  plus_one: boolean;
  plus_one_name: string | null;
  dietary_restrictions: string | null;
  message: string | null;
  language: string;
  created_at: string;
}

interface Photo {
  id: string;
  guest_name: string;
  file_path: string;
  file_name: string;
  caption: string | null;
  category: string;
  created_at: string;
}

export const AdminDashboard = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeTab, setActiveTab] = useState<'rsvps' | 'photos'>('rsvps');

  useEffect(() => {
    const auth = sessionStorage.getItem('wedding_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    await loadRSVPs();
    await loadPhotos();
  };

  const loadRSVPs = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRsvps(data || []);
    } catch (err) {
      console.error('Error loading RSVPs:', err);
    }
  };

  const loadPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('wedding_photos')
        .select('id, guest_name, file_path, file_name, caption, category, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (err) {
      console.error('Error loading photos:', err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'wedding2026') {
      sessionStorage.setItem('wedding_admin_auth', 'true');
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('wedding_admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleDeletePhoto = async (photoId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      await supabase.storage.from('wedding-photos').remove([filePath]);
      await supabase.from('wedding_photos').delete().eq('id', photoId);
      loadPhotos();
    } catch (err) {
      console.error('Error deleting photo:', err);
      alert('Error deleting photo');
    }
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Attending', 'Plus One', 'Plus One Name', 'Dietary Restrictions', 'Message', 'Language', 'Date'];
    const rows = rsvps.map(rsvp => [
      rsvp.guest_name,
      rsvp.email,
      rsvp.phone || '',
      rsvp.attending ? 'Yes' : 'No',
      rsvp.plus_one ? 'Yes' : 'No',
      rsvp.plus_one_name || '',
      rsvp.dietary_restrictions || '',
      rsvp.message || '',
      rsvp.language,
      new Date(rsvp.created_at).toLocaleString()
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-rsvps.csv';
    a.click();
  };

  const getPhotoUrl = (path: string) => {
    const { data } = supabase.storage.from('wedding-photos').getPublicUrl(path);
    return data.publicUrl;
  };

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter(r => r.attending).length,
    notAttending: rsvps.filter(r => !r.attending).length,
    plusOnes: rsvps.filter(r => r.plus_one).length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <Lock className="w-12 h-12 text-pink-400" />
            </div>

            <h2 className="text-3xl font-serif text-center text-gray-800 mb-8">
              {t('admin.title')}
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('admin.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  placeholder="wedding2026"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white font-medium py-3 rounded-lg transition-all"
              >
                {t('admin.login')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-serif text-gray-800">{t('admin.title')}</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t('admin.logout')}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <Users className="w-8 h-8 text-pink-400 mb-2" />
            <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-gray-600">{t('admin.totalRsvps')}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <UserCheck className="w-8 h-8 text-green-400 mb-2" />
            <div className="text-3xl font-bold text-gray-800">{stats.attending}</div>
            <div className="text-gray-600">{t('admin.attending')}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <UserX className="w-8 h-8 text-red-400 mb-2" />
            <div className="text-3xl font-bold text-gray-800">{stats.notAttending}</div>
            <div className="text-gray-600">{t('admin.notAttending')}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <Users className="w-8 h-8 text-blue-400 mb-2" />
            <div className="text-3xl font-bold text-gray-800">{stats.plusOnes}</div>
            <div className="text-gray-600">{t('admin.plusOnes')}</div>
          </div>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveTab('rsvps')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'rsvps'
                ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            {t('admin.rsvpList')}
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'photos'
                ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Image className="w-5 h-5" />
            {t('admin.photos')} ({photos.length})
          </button>
        </div>

        {activeTab === 'rsvps' && (
          <>
            <div className="mb-6 flex justify-end">
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-md"
              >
                <Download className="w-5 h-5" />
                {t('admin.downloadCsv')}
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {rsvps.length === 0 ? (
                <p className="text-center text-gray-500 py-12">{t('admin.noRsvps')}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-pink-100 to-blue-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Attending</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plus One</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Dietary</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lang</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{rsvp.guest_name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{rsvp.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{rsvp.phone || '-'}</td>
                          <td className="px-6 py-4 text-sm">
                            {rsvp.attending ? (
                              <span className="text-green-600 font-medium">Yes</span>
                            ) : (
                              <span className="text-red-600 font-medium">No</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {rsvp.plus_one ? rsvp.plus_one_name || 'Yes' : '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {rsvp.dietary_restrictions || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 uppercase">
                            {rsvp.language}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                No photos uploaded yet
              </div>
            ) : (
              photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={getPhotoUrl(photo.file_path)}
                    alt={photo.caption || photo.file_name}
                    className="w-full aspect-square object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      photo.category === 'gallery'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}>
                      {photo.category === 'gallery' ? 'Gallery' : 'User Upload'}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => handleDeletePhoto(photo.id, photo.file_path)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t('admin.deletePhoto')}
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">{photo.guest_name}</p>
                    {photo.caption && (
                      <p className="text-xs text-gray-500">{photo.caption}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};