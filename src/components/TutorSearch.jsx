import React, { useState } from 'react'
import { Search, MapPin, Star, Filter } from 'lucide-react'
import TutorCard from './TutorCard'

const TutorSearch = ({ tutors, onViewTutor, onBookTutor }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const subjects = ['all', 'Matemática', 'Física', 'Química', 'Português', 'História', 'Biologia']

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.subjects.some(subject => 
                           subject.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    const matchesSubject = selectedSubject === 'all' || 
                          tutor.subjects.includes(selectedSubject)
    
    return matchesSearch && matchesSubject
  })

  return (
    <div className="px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Encontre o Explicador Perfeito
        </h1>
        <p className="text-gray-600">
          📍 Maputo • {tutors.length} explicadores disponíveis
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Procurar por disciplina ou nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-primary font-medium"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </button>
        <p className="text-sm text-gray-500">
          {filteredTutors.length} de {tutors.length} explicadores
        </p>
      </div>

      {/* Subject Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-3">Disciplina</h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  selectedSubject === subject
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subject === 'all' ? 'Todas' : subject}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trust Indicator */}
      <div className="card p-4 mb-6">
        <div className="flex items-center text-secondary font-medium">
          <span className="text-lg mr-2">🛡️</span>
          Sua Segurança é Prioridade
        </div>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <div>✅ Explicadores verificados</div>
          <div>✅ Avaliações reais</div>
          <div>✅ Suporte 24/7</div>
        </div>
      </div>

      {/* Tutors List */}
      <div className="space-y-4">
        {filteredTutors.length > 0 ? (
          filteredTutors.map(tutor => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onView={() => onViewTutor(tutor)}
              onBook={() => onBookTutor(tutor)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum explicador encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Não encontrámos o que procura, mas não desista!
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <div>💡 Sugestões:</div>
              <div>• Aumente o raio de pesquisa</div>
              <div>• Tente outra disciplina</div>
              <div>• Verifique a disponibilidade</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TutorSearch