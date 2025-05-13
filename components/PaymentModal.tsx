'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  referrerId?: string;
}

const PaymentModal = ({ isOpen, onClose, planTitle, referrerId }: PaymentModalProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    pacchetto: planTitle,
    paymentMethod: 'bonifico'
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      setTimeout(() => setShowModal(false), 300); // Delay hide to match exit animation
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, pacchetto: planTitle })); // Update pacchetto when modal opens
    }
  }, [isOpen, planTitle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pacchetto: planTitle,
          referrerId,
        }),
      });

      const data = await response.json();

      if (formData.paymentMethod === 'mastercard' || formData.paymentMethod === 'visa') {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to load');

        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (result.error) {
          console.error(result.error);
        }
      } else if (formData.paymentMethod === 'bonifico') {
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20 overflow-auto"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-[#1C1C1C] rounded-[30px] py-[30px] px-[3%] w-full max-w-[90%] md:max-w-[700px] lg:max-w-[1000px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-6 right-6 md:top-12 md:right-12 text-white text-xl md:text-2xl" onClick={onClose}>✕</button>
            <h2 className="text-white text-2xl md:text-[43px] leading-6 md:leading-[55px] mb-4">Iscriviti alla waiting list</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome*"
                  className="bg-[#1A1A1A] text-white text-[18px] leading-[26px] py-[20px] px-[40px] shadow-inset-black1 rounded-[18px]"
                  required
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="cognome"
                  placeholder="Cognome*"
                  className="bg-[#1A1A1A] text-white text-[18px] leading-[26px] py-[20px] px-[40px] shadow-inset-black1 rounded-[18px]"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail*"
                  className="bg-[#1A1A1A] text-white text-[18px] leading-[26px] py-[20px] px-[40px] shadow-inset-black1 rounded-[18px]"
                  required
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Numero di telefono*"
                  className="bg-[#1A1A1A] text-white text-[18px] leading-[26px] py-[20px] px-[40px] shadow-inset-black1 rounded-[18px]"
                  required
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="pacchetto"
                  value={'Pacchetto selezionato: ' + formData?.pacchetto}
                  className="bg-[#1A1A1A] text-[#BABABA] text-[18px] leading-[26px] py-[20px] px-[40px]  shadow-inset-black1 rounded-[18px]"
                  readOnly
                />
              </div>

              <div className="my-8">
                <h3 className="text-white text-[43px] leading-[55px] mb-2">Metodo di pagamento</h3>
                <div className="flex flex-wrap gap-4 md:flex-nowrap">
                  <button
                    type="button"
                    className={`p-4 flex justify-center items-center rounded-[18px] w-[138px] h-[76px] shadow-inset-black1 ${formData.paymentMethod === 'visa' ? 'border-2 border-[#6EBFD0]' : ''
                      }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'visa' })}
                  >
                    <img src="/visa.png" alt="Visa" className="h-6" />
                  </button>
                  <button
                    type="button"
                    className={`p-4 flex justify-center items-center rounded-[18px] w-[138px] h-[76px] shadow-inset-black1 ${formData.paymentMethod === 'mastercard' ? 'border-2 border-[#6EBFD0]' : ''
                      }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'mastercard' })}
                  >
                    <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                  </button>
                  <button
                    type="button"
                    className={`p-4 flex justify-center items-center rounded-[18px] w-[138px] h-[76px] shadow-inset-black1 ${formData.paymentMethod === 'paypal' ? 'border-2 border-[#6EBFD0]' : ''
                      }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                  >
                    <img src="/paypal.png" alt="PayPal" className="h-6" />
                  </button>
                  <button
                    type="button"
                    className={`p-4 flex justify-center rounded-[18px] w-[138px] h-[76px] text-white shadow-inset-black1 items-center sm:gap-[9px] ${formData.paymentMethod === 'bonifico' ? 'border-2 border-[#6EBFD0]' : ''
                      }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'bonifico' })}
                  >
                    <img src="/bonifico.png" alt="Bonifico" className="h-6" />
                    <span>BONIFICO</span>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {formData.paymentMethod === 'bonifico' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mb-4 text-white text-sm overflow-hidden"
                  >
                    <h4 className="font-bold mb-2 text-[20px] leading-[30px]">Bonifico bancario:</h4>
                    <p className='text-[18px] leading-[24px]'><strong>BANCA:</strong> Monte dei Paschi di Siena</p>
                    <p className='text-[18px] leading-[24px]'><strong>IBAN:</strong> IT00K0000000000000000000000</p>
                    <p className='text-[18px] leading-[24px]'><strong>INTESTATO A:</strong> Rutheons S.r.l.</p>
                    <p className='text-[18px] leading-[24px]'><strong>BIC/SWIFT:</strong> ISO 9362</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className='flex justify-center items-center gap-[59px]'>
                <span className='text-[#BABABA] text-[16px] leading-[20px]'>Effettua il bonifico e clicca su “Conferma pagamento”. Riceverai una mail con i dettagli dell’ordine e la ricevuta non appena il pagamento sarà verificato.</span>
                <button
                  type="submit"
                  className="w-full bg-[#5BB5C9] text-white justify-center flex py-[20px] rounded-[21px] hover:bg-[#4A9AAF] transition-colors mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    formData.paymentMethod === 'bonifico' ? 'CONFERMA PAGAMENTO' : 'ISCRIVITI ALLA WAITING LIST'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div >
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
