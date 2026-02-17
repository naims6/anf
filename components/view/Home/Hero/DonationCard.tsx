// 'use client';

// import { useState } from 'react';
// import { Phone, Mail, Heart, Shield } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// const donationFunds = [
//   { value: 'zakat', label: 'যাকাত' },
//   { value: 'sadaqah', label: 'সাদাকাহ' },
//   { value: 'education', label: 'শিক্ষা তহবিল' },
//   { value: 'emergency', label: 'জরুরী তহবিল' },
//   { value: 'winter', label: 'শীতবার্তা তহবিল' },
//   { value: 'qurbani', label: 'কুরবানি তহবিল' },
// ];

// export default function DonationCard() {
//   const [selectedFund, setSelectedFund] = useState('');
//   const [amount, setAmount] = useState('');
//   const [contact, setContact] = useState('');

//   const handleDonate = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ selectedFund, amount, contact });
//     // Handle donation logic
//   };

//   return (
//     <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8 w-full mx-auto mb-20">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
//           <Heart className="w-6 h-6 text-white" />
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 mb-2 font-bangla">
//           দান করুন
//         </h3>
//         <p className="text-gray-600 font-bangla text-sm">
//           আপনার দান অসহায় মানুষের মুখে হাসি ফুটাবে
//         </p>
//       </div>

//       <form onSubmit={handleDonate} className="space-y-5">
//         {/* Fund Selection */}
//         <div className="space-y-2">
//           <Label htmlFor="fund" className="text-sm font-semibold text-gray-700 font-bangla">
//             তহবিল নির্বাচন করুন
//           </Label>
//           <Select value={selectedFund} onValueChange={setSelectedFund}>
//             <SelectTrigger className="w-full h-12 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 font-bangla text-gray-700">
//               <SelectValue placeholder="তহবিল নির্বাচন করুন" />
//             </SelectTrigger>
//             <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white font-bangla">
//               {donationFunds.map((fund) => (
//                 <SelectItem 
//                   key={fund.value} 
//                   value={fund.value}
//                   className="font-bangla text-gray-700 hover:bg-emerald-50 focus:bg-emerald-50"
//                 >
//                   {fund.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Contact Input */}
//         <div className="space-y-2">
//           <Label htmlFor="contact" className="text-sm font-semibold text-gray-700 font-bangla">
//             ফোন নম্বর বা ইমেইল
//           </Label>
//           <div className="relative">
//             <Input
//               id="contact"
//               type="text"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//               placeholder="01XXXXXXXXX বা example@email.com"
//               className="pl-11 h-12 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 font-bangla text-gray-700"
//               required
//             />
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               {contact.includes('@') ? (
//                 <Mail className="w-5 h-5" />
//               ) : (
//                 <Phone className="w-5 h-5" />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Amount Input */}
//         <div className="space-y-3">
//           <Label htmlFor="amount" className="text-sm font-semibold text-gray-700 font-bangla">
//             পরিমাণ (টাকা)
//           </Label>
//           <Input
//             id="amount"
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="1000"
//             className="h-12 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 text-lg font-semibold font-bangla text-gray-700"
//             min="1"
//             required
//           />
          
//         </div>

//         {/* Donate Button */}
//         <Button
//           type="submit"
//           className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] font-bangla"
//         >
//           <Heart className="w-5 h-5 mr-2" />
//           দান করুন
//         </Button>
//       </form>

//       {/* Security Badge */}
//       <div className="mt-4 pt-4 border-t border-gray-200/50 text-center">
//         <p className="text-xs text-gray-500 flex items-center justify-center gap-2 font-bangla">
//           <Shield className="w-3 h-3 text-emerald-500" />
//           ১০০% সুরক্ষিত ও স্বচ্ছ লেনদেন
//         </p>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { Phone, Mail, Heart, Shield } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// const donationFunds = [
//   { value: 'zakat', label: 'যাকাত' },
//   { value: 'sadaqah', label: 'সাদাকাহ' },
//   { value: 'education', label: 'শিক্ষা তহবিল' },
//   { value: 'emergency', label: 'জরুরী তহবিল' },
//   { value: 'winter', label: 'শীতবার্তা তহবিল' },
//   { value: 'qurbani', label: 'কুরবানি তহবিল' },
// ];

// export default function DonationCard() {
//   const [selectedFund, setSelectedFund] = useState('');
//   const [amount, setAmount] = useState('');
//   const [contact, setContact] = useState('');

//   const handleDonate = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ selectedFund, amount, contact });
//     // Handle donation logic
//   };

//   return (
//     <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 w-full mx-auto ">
//       {/* Header */}
//       <div className="text-center ">
//         {/* <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
//           <Heart className="w-6 h-6 text-white" />
//         </div> */}
//         <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-bangla">
//          আপনার অনুদান প্রদান করুন
//         </h3>
//         {/* <p className="text-gray-600 font-bangla text-sm">
//           আপনার দান অসহায় মানুষের মুখে হাসি ফুটাবে
//         </p> */}
//       </div>

//       <form onSubmit={handleDonate} className="space-y-4 flex flex-col md:flex-row gap-3">
//         {/* Fund Selection */}
//         <div className="space-y-2">
//           <Label htmlFor="fund" className="text-sm font-semibold text-gray-700 font-bangla">
//             তহবিল নির্বাচন করুন
//           </Label>
//           <Select value={selectedFund} onValueChange={setSelectedFund}>
//             <SelectTrigger className="w-full h-12 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 font-bangla text-gray-700">
//               <SelectValue placeholder="তহবিল নির্বাচন করুন" />
//             </SelectTrigger>
//             <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white font-bangla">
//               {donationFunds.map((fund) => (
//                 <SelectItem 
//                   key={fund.value} 
//                   value={fund.value}
//                   className="font-bangla text-gray-700 hover:bg-emerald-50 focus:bg-emerald-50"
//                 >
//                   {fund.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Contact Input */}
//         <div className="space-y-2">
//           <Label htmlFor="contact" className="text-sm font-semibold text-gray-700 font-bangla">
//             ফোন নম্বর বা ইমেইল
//           </Label>
//           <div className="relative">
//             <Input
//               id="contact"
//               type="text"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//               placeholder="01XXXXXXXXX বা example@email.com"
//               className="pl-11 h-12 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 font-bangla text-gray-700"
//               required
//             />
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               {contact.includes('@') ? (
//                 <Mail className="w-5 h-5" />
//               ) : (
//                 <Phone className="w-5 h-5" />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Amount Input */}
//         <div className="space-y-3">
//           <Label htmlFor="amount" className="text-sm font-semibold text-gray-700 font-bangla">
//             পরিমাণ (টাকা)
//           </Label>
//           <Input
//             id="amount"
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="1000"
//             className="h-12 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 text-lg font-semibold font-bangla text-gray-700"
//             min="1"
//             required
//           />
//         </div>

//         {/* Donate Button */}
//         <Button
//           type="submit"
//           className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] font-bangla"
//         >
//           <Heart className="w-5 h-5 mr-2" />
//           দান করুন
//         </Button>
//       </form>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { Phone, Mail, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const donationFunds = [
  { value: 'zakat', label: 'যাকাত' },
  { value: 'sadaqah', label: 'সাদাকাহ' },
  { value: 'education', label: 'শিক্ষা তহবিল' },
  { value: 'emergency', label: 'জরুরী তহবিল' },
  { value: 'winter', label: 'শীতবার্তা তহবিল' },
  { value: 'qurbani', label: 'কুরবানি তহবিল' },
];

export default function DonationCard() {
  const [selectedFund, setSelectedFund] = useState('');
  const [amount, setAmount] = useState('');
  const [contact, setContact] = useState('');

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedFund, amount, contact });
    // Handle donation logic
  };

  return (
    <div className="bg-white/75 backdrop-blur-xl rounded-2xl  border border-primary p-6 md:w-[90%] mx-auto pb-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-bangla">
          আপনার অনুদান প্রদান করুন
        </h3>
      </div>

      <form onSubmit={handleDonate} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
        {/* Fund Selection */}
        <div className="space-y-2 md:flex-1">
          <Label htmlFor="fund" className="text-sm font-semibold text-gray-700 font-bangla">
            তহবিল নির্বাচন করুন
          </Label>
          <Select  value={selectedFund} onValueChange={setSelectedFund}>
            <SelectTrigger className="w-full h-12 py-4 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 font-bangla text-gray-700">
              <SelectValue placeholder="তহবিল নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white font-bangla">
              {donationFunds.map((fund) => (
                <SelectItem 
                  key={fund.value} 
                  value={fund.value}
                  className="font-bangla text-gray-700 hover:bg-emerald-50 focus:bg-emerald-50"
                >
                  {fund.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact Input */}
        <div className="space-y-2 md:flex-1">
          <Label htmlFor="contact" className="text-sm font-semibold text-gray-700 font-bangla">
            ফোন নম্বর বা ইমেইল
          </Label>
          <div className="relative">
            <Input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="pl-11 h-12 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 font-bangla text-gray-700"
              required
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {contact.includes('@') ? (
                <Mail className="w-5 h-5" />
              ) : (
                <Phone className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2 md:flex-1">
          <Label htmlFor="amount" className="text-sm font-semibold text-gray-700 font-bangla">
            পরিমাণ (টাকা)
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            className="h-12 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500 text-lg font-semibold font-bangla text-gray-700"
            min="1"
            required
          />
        </div>

        {/* Donate Button */}
        <Button
          type="submit"
          className="w-full h-12 md:w-auto md:flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] font-bangla"
        >
          <Heart className="w-5 h-5 mr-2" />
          দান করুন
        </Button>
      </form>
    </div>
  );
}