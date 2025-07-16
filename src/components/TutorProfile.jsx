import React from 'react'
import { Star, MapPin, MessageCircle, Share2 } from 'lucide-react'

const TutorProfile = ({ tutor, onBook }) => {
  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="card p-6 mb-6 text-center">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mx-auto">
            {tutor.avatar}
          </div>
          {tutor.online && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {tutor.name}
        </h1>
        
        <div className="flex items-center justify-center space-x-4 mb-3">
          <div className="flex items-center">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold ml-1">{tutor.rating}</span>
            <span className="text-gray-500 ml-1">• {tutor.reviewCount} avaliações</span>
          </div>
          {tutor.verified && (
            <div className="flex items-center text-secondary">
              <span className="mr-1">🏅</span>
              <span className="text-sm font-medium">Verificado</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{tutor.location}</span>
          <span className="ml-2 text-secondary">📍 A {tutor.distance} de si</span>
        </div>

        <div className="text-xl font-bold text-primary mb-4">
          {tutor.price}MT/hora
        </div>

        {tutor.online && (
          <div className="text-secondary font-medium mb-4">
            🟢 Disponível agora
          </div>
        )}
      </div>

      {/* Subjects */}
      <div className="card p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">🎓 Disciplinas</h3>
        <div className="flex flex-wrap gap-2">
          {tutor.subjects.map((subject, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-primary text-white text-sm rounded-full"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="card p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">📋 Sobre Mim</h3>
        <p className="text-gray-700 leading-relaxed">{tutor.description}</p>
        <div className="mt-3 text-sm text-gray-600">
          👨‍🎓 {tutor.experience} de experiência
        </div>
      </div>

      {/* Specialties */}
      <div className="card p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">🎯 Especialidades</h3>
        <ul className="space-y-2">
          {tutor.specialties.map((specialty, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="mr-2">•</span>
              {specialty}
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="card p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">⭐ Avaliações Recentes</h3>
        <div className="space-y-4">
          {tutor.reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
              <div className="flex items-center mb-2">
                <span className="font-medium text-gray-900">{review.name}</span>
                <div className="flex ml-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="card p-4 mb-6 border-orange-200 bg-orange-50">
        <div className="flex items-start">
          <span className="text-lg mr-3">⚠️</span>
          <div>
            <h4 className="font-semibold text-orange-800 mb-2">Primeira sessão?</h4>
            <div className="text-sm text-orange-700 space-y-1">
              <div>• Escolha local público e seguro</div>
              <div>• Partilhe localização com familiar/amigo</div>
              <div>• Confirme identidade do explicador</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
        <button
          onClick={onBook}
          className="btn-primary w-full"
        >
          🗓️ Ver Disponibilidade
        </button>
        <button className="btn-secondary w-full">
          💬 Contactar Directamente
        </button>
      </div>

      {/* Bottom padding for fixed buttons */}
      <div className="h-32"></div>
    </div>
  )
}

export default TutorProfile