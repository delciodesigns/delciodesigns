import React, { useState } from 'react'
import Header from './components/Header'
import TutorSearch from './components/TutorSearch'
import TutorProfile from './components/TutorProfile'
import BookingModal from './components/BookingModal'

function App() {
  const [currentScreen, setCurrentScreen] = useState('search')
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const tutors = [
    {
      id: 1,
      name: 'João Silva',
      avatar: '👨‍🏫',
      rating: 4.8,
      reviewCount: 127,
      verified: true,
      subjects: ['Matemática', 'Física', 'Química'],
      price: 500,
      location: 'Maputo, Bairro Central',
      distance: '2.5km',
      experience: '3 anos',
      online: true,
      description: 'Licenciado em Matemática com experiência em preparação para exames nacionais. Especialista em explicar conceitos complexos de forma simples.',
      specialties: ['Preparação para exames', 'Aulas para iniciantes', 'Matemática avançada'],
      availability: ['09:00', '14:00', '16:30', '18:00', '19:30'],
      reviews: [
        { name: 'Maria S.', rating: 5, comment: 'Excelente explicador! Muito paciente e claro nas explicações.' },
        { name: 'Pedro M.', rating: 5, comment: 'Ajudou muito na preparação para os exames. Recomendo!' }
      ]
    },
    {
      id: 2,
      name: 'Ana Costa',
      avatar: '👩‍🏫',
      rating: 4.9,
      reviewCount: 89,
      verified: true,
      subjects: ['Português', 'História'],
      price: 450,
      location: 'Maputo, Polana',
      distance: '1.2km',
      experience: '5 anos',
      online: false,
      description: 'Professora de Português com mestrado em Literatura. Especialista em redação e preparação para exames.',
      specialties: ['Redação', 'Literatura', 'Preparação para exames'],
      availability: ['10:00', '15:00', '17:00'],
      reviews: [
        { name: 'Carlos R.', rating: 5, comment: 'Melhor professora de português que já tive!' }
      ]
    },
    {
      id: 3,
      name: 'Miguel Santos',
      avatar: '👨‍🔬',
      rating: 4.7,
      reviewCount: 156,
      verified: true,
      subjects: ['Biologia', 'Química'],
      price: 550,
      location: 'Maputo, Sommerschield',
      distance: '3.8km',
      experience: '4 anos',
      online: true,
      description: 'Biólogo com experiência em ensino. Aulas práticas e teóricas adaptadas ao nível do aluno.',
      specialties: ['Biologia molecular', 'Química orgânica', 'Preparação universitária'],
      availability: ['08:00', '13:00', '16:00', '19:00'],
      reviews: [
        { name: 'Sofia L.', rating: 5, comment: 'Explicações muito claras e didácticas.' }
      ]
    }
  ]

  const handleViewTutor = (tutor) => {
    setSelectedTutor(tutor)
    setCurrentScreen('profile')
  }

  const handleBookTutor = (tutor) => {
    setSelectedTutor(tutor)
    setShowBookingModal(true)
  }

  const handleBack = () => {
    if (currentScreen === 'profile') {
      setCurrentScreen('search')
      setSelectedTutor(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={currentScreen === 'profile' ? handleBack : null} />
      
      <main className="pb-6">
        {currentScreen === 'search' && (
          <TutorSearch 
            tutors={tutors} 
            onViewTutor={handleViewTutor}
            onBookTutor={handleBookTutor}
          />
        )}
        
        {currentScreen === 'profile' && selectedTutor && (
          <TutorProfile 
            tutor={selectedTutor} 
            onBook={() => handleBookTutor(selectedTutor)}
          />
        )}
      </main>

      {showBookingModal && selectedTutor && (
        <BookingModal
          tutor={selectedTutor}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  )
}

export default App