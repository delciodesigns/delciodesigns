import React from 'react'
import { ArrowLeft, Share2 } from 'lucide-react'

const Header = ({ onBack, showShare = false }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        {onBack ? (
          <button 
            onClick={onBack}
            className="flex items-center text-primary font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Voltar
          </button>
        ) : (
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              Xplicalandia
            </div>
          </div>
        )}
        
        {showShare && (
          <button className="p-2 text-gray-600">
            <Share2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header