import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const RSVPForm = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    attending: true,
    plus_one: false,
    plus_one_name: '',
    dietary_restrictions: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted! Starting...'); // Debug
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      console.log('Sending to Supabase...', formData); // Debug
      const { error: submitError, data } = await supabase
        .from('rsvps')
        .insert([{
          ...formData,
          language,
          updated_at: new Date().toISOString()
        }])
        .select();

      console.log('Supabase response:', { error: submitError, data }); // Debug

      if (submitError) throw submitError;

      console.log('Success! Data saved.'); // Debug
      setSuccess(true);
      setFormData({
        guest_name: '',
        email: '',
        attending: true,
        plus_one: false,
        plus_one_name: '',
        dietary_restrictions: '',
        message: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="rsvp" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-paper">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-2 border-charcoal p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-dark-brown mb-4 sm:mb-6 tracking-wide">
              {t('rsvp.title')}
            </h2>
          </div>

          {success && (
            <div className="mb-8 p-4 border-0.5 border-green-600 text-green-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {t('rsvp.success')}
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 border-0.5 border-red-600 text-red-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {t('rsvp.error')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label className="editorial-label text-charcoal/70 mb-2 sm:mb-3 block">
              {t('rsvp.name')} *
            </label>
            <input
              type="text"
              required
              value={formData.guest_name}
              onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
              className="w-full px-4 py-3 sm:py-4 min-h-[44px] border border-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal font-serif text-base"
            />
          </div>

          <div>
            <label className="editorial-label text-charcoal/70 mb-2 sm:mb-3 block">
              {t('rsvp.email')} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 sm:py-4 min-h-[44px] border border-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal font-serif text-base"
            />
          </div>

          <div>
            <label className="editorial-label text-charcoal/70 mb-2 sm:mb-3 block">
              {t('rsvp.attending')} *
            </label>
            <div className="flex gap-4 sm:gap-6">
              <label className="flex items-center gap-2 sm:gap-3 cursor-pointer min-h-[44px]">
                <input
                  type="radio"
                  name="attending"
                  checked={formData.attending === true}
                  onChange={() => setFormData({ ...formData, attending: true })}
                  className="w-5 h-5 sm:w-4 sm:h-4"
                />
                <span className="text-dark-brown font-serif text-base">{t('rsvp.yes')}</span>
              </label>
              <label className="flex items-center gap-2 sm:gap-3 cursor-pointer min-h-[44px]">
                <input
                  type="radio"
                  name="attending"
                  checked={formData.attending === false}
                  onChange={() => setFormData({ ...formData, attending: false })}
                  className="w-5 h-5 sm:w-4 sm:h-4"
                />
                <span className="text-dark-brown font-serif text-base">{t('rsvp.no')}</span>
              </label>
            </div>
          </div>

          {formData.attending && (
            <>
              <div>
                <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={formData.plus_one}
                    onChange={(e) => setFormData({ ...formData, plus_one: e.target.checked })}
                    className="w-5 h-5 sm:w-4 sm:h-4 rounded"
                  />
                  <span className="editorial-label text-charcoal/70">{t('rsvp.plusOne')}</span>
                </label>
              </div>

              {formData.plus_one && (
                <div>
                  <label className="editorial-label text-charcoal/70 mb-2 sm:mb-3 block">
                    {t('rsvp.plusOneName')}
                  </label>
                  <input
                    type="text"
                    value={formData.plus_one_name}
                    onChange={(e) => setFormData({ ...formData, plus_one_name: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 min-h-[44px] border border-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal font-serif text-base"
                  />
                </div>
              )}

              <div>
                <label className="editorial-label text-charcoal/70 mb-2 sm:mb-3 block">
                  {t('rsvp.dietary')}
                </label>
                <textarea
                  value={formData.dietary_restrictions}
                  onChange={(e) => setFormData({ ...formData, dietary_restrictions: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 sm:py-4 border border-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal font-serif resize-none text-base"
                />
              </div>
            </>
          )}

          <div>
            <label className="editorial-label text-charcoal/70 mb-2 sm:mb-3 block">
              {t('rsvp.message')}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 sm:py-4 border border-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal font-serif resize-none text-base"
            />
          </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal text-paper hover:bg-dark-brown font-display text-base sm:text-lg tracking-widest py-4 sm:py-5 min-h-[48px] transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              {loading ? '...' : t('rsvp.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};