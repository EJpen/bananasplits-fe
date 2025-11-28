import React from 'react';
import { CreditCard, Banana } from 'lucide-react';

interface BankCardProps extends React.HTMLAttributes<HTMLDivElement> {
  balance: string;
  bankName: string;
  last4: string;
  className?: string;
  color?: 'yellow' | 'blue' | 'green' | 'red';
}

const BankCard: React.FC<BankCardProps> = ({ 
  balance, 
  bankName, 
  last4, 
  className = '', 
  color = 'yellow',
  style,
  ...props
}) => {
  const colorGradients = {
    yellow: "bg-gradient-to-br from-banana-500 to-banana-600",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    green: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    red: "bg-gradient-to-br from-rose-500 to-rose-600"
  };

  const gradient = colorGradients[color] || colorGradients.yellow;

  return (
    <div 
      className={`${gradient} rounded-2xl p-6 text-dark-900 shadow-xl relative overflow-hidden select-none h-64 ${className}`} 
      style={style}
      {...props}
    >
      <div className="absolute -right-6 -bottom-6 opacity-20 pointer-events-none">
        <Banana size={120} className="text-white" />
      </div>
      <div className="relative z-10 pointer-events-none h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <CreditCard className="text-dark-900" size={24} />
          <span className="font-mono text-sm font-bold opacity-75">{bankName}</span>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs opacity-75 uppercase font-bold tracking-wider mb-1">Balance</p>
          <p className="text-4xl font-bold tracking-tight">{balance}</p>
        </div>
        <div className="flex justify-between items-end">
          <p className="font-mono text-sm opacity-80 font-medium">•••• •••• •••• {last4}</p>
        </div>
      </div>
    </div>
  );
};

export default BankCard;