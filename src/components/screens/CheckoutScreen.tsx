import { useState, FormEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Info, ChevronRight, Lock, CreditCard } from 'lucide-react';

export default function CheckoutScreen() {
  const { donationDraft, projects, submitDonation, setPage, currentUser } = useApp();

  // If there is no active draft, we show an error/empty state
  if (!donationDraft) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-6 p-8 bg-white border border-slate-100 rounded-3xl">
        <Info className="h-12 w-12 text-slate-300 mx-auto" />
        <h2 className="font-display font-extrabold text-xl text-slate-900">No Active Donation Draft</h2>
        <p className="text-slate-500 text-sm">
          Please select a project first and click "Donate Now" to prepare an impact-driven contribution draft.
        </p>
        <button
          onClick={() => setPage('browse')}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm cursor-pointer"
        >
          Browse Campaigns
        </button>
      </div>
    );
  }

  const project = projects.find(p => p.id === donationDraft.projectId);
  if (!project) return null;

  // Form states
  const [firstName, setFirstName] = useState(currentUser ? currentUser.name.split(' ')[0] : '');
  const [lastName, setLastName] = useState(currentUser ? currentUser.name.split(' ')[1] || '' : '');
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCVC, setCardCVC] = useState('123');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Totals calculations
  const platformFee = 7.50; // Flat platform processing maintenance fee
  const totalAmount = donationDraft.amount + platformFee;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Execute contribution transaction inside Context state
      const fullName = `${firstName} ${lastName}`.trim() || 'Anonymous Supporter';
      const emailAddr = email || 'anonymous@kindred.org';
      
      const res = submitDonation(isAnonymous, fullName, emailAddr);
      setIsSubmitting(false);

      if (res.success) {
        // Redirection handled inside submitDonation context (to dashboard)
      } else {
        alert(`Error executing donation: ${res.error}`);
      }
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="checkout-screen">
      
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
          Complete Your Impact
        </h1>
        <p className="text-slate-500 text-sm">
          Coordinate your transparent, tax-deductible pledge to field projects.
        </p>
      </div>

      {/* Progress Stepper indicators */}
      <div className="flex items-center gap-2 max-w-sm text-xs font-semibold text-slate-400">
        <span className="text-emerald-600">1. Details</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-emerald-600">2. Secure Payment</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-300">3. Confirmation</span>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2-Thirds Form inputs */}
        <form onSubmit={handleCheckoutSubmit} className="lg:col-span-2 space-y-6">
          
          {/* Box 1: Donor Info */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-extrabold text-base text-slate-800">1. Donor Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="Sarah"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jenkins"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Billing Email Address</label>
              <input
                type="email"
                required
                placeholder="sarah.jenkins@impact.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
              <p className="text-[10px] text-slate-400">All formal audit summaries and tax receipts will be sent here.</p>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 mt-2">
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-slate-700">Pledge Anonymously?</span>
                <span className="block text-[10px] text-slate-400 leading-none">Hide your profile image and identity from public feed</span>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Box 2: Payment Method */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-extrabold text-base text-slate-800">2. Secure Payment Method</h3>
            
            {/* Payment tab togglers */}
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-3 border rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`py-2 px-3 border rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  paymentMethod === 'paypal'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                PayPal
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Secure CVC</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      placeholder="CVC"
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border rounded-xl text-center space-y-2">
                <p className="text-xs text-slate-600">PayPal integration enabled.</p>
                <p className="text-[10px] text-slate-400">Clicking "Complete Donation" will launch the secure PayPal popup overlay for fast checkout validation.</p>
              </div>
            )}
          </div>

          {/* Verification Checkbox */}
          <div className="flex gap-2.5 items-start text-xs text-slate-400 leading-relaxed">
            <input type="checkbox" required defaultChecked className="mt-0.5" />
            <span>I agree to Kindred platform terms, declaring that these funds are derived from legal sources, and consent to receiving quarterly audited transaction summaries of my funded projects.</span>
          </div>

          {/* Secure lock cta */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-fit bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-500/50 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Executing Ledger Pledge...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Complete Donation — ${(totalAmount).toFixed(2)}
              </>
            )}
          </button>

        </form>

        {/* Right Third: Summary Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-6">
            <h3 className="font-display font-extrabold text-base text-slate-800 pb-3 border-b border-slate-50">
              Contribution Summary
            </h3>
            
            {/* Brief Project Tag */}
            <div className="flex gap-3">
              <img
                src={project.image}
                alt={project.title}
                className="h-12 w-12 rounded-xl object-cover border border-slate-100 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="truncate">
                <h4 className="text-xs font-bold text-slate-800 truncate">{project.title}</h4>
                <p className="text-[10px] text-slate-400 font-mono">Governed by: {project.organizationName}</p>
              </div>
            </div>

            {/* Calculations List */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Campaign Contribution:</span>
                <span className="font-mono font-bold text-slate-800">${donationDraft.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Kindred Platform Audit Fee:</span>
                <span className="font-mono font-bold text-slate-800">${platformFee.toFixed(2)}</span>
              </div>
              
              <hr className="border-slate-50 my-3" />
              
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-800">Total Charged Amt:</span>
                <span className="font-mono font-black text-emerald-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Dynamic visual tag for recurring */}
            {donationDraft.isRecurring && (
              <div className="p-3 bg-blue-50 text-blue-800 border border-blue-100/60 rounded-xl text-xs font-medium">
                Recurring Frequency: You will be charged ${donationDraft.amount.toFixed(2)} automatically on the 1st of every month. Can cancel anytime in your dashboard.
              </div>
            )}

            {/* Security stamp card */}
            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-2 text-center">
              <ShieldCheck className="h-8 w-8 text-emerald-500 mx-auto" />
              <p className="text-[11px] font-bold text-slate-800 leading-none">AES-256 Bank Encrypted</p>
              <p className="text-[9px] text-slate-400 leading-tight">
                All contributions are locked under secure compliance trusts and processed via PCI-DSS compliant providers.
              </p>
            </div>

          </div>
        </aside>

      </div>

    </div>
  );
}
