import React, { useState } from 'react'
import { X, Calendar, Clock, CreditCard, MapPin, AlertTriangle, CheckCircle } from 'lucide-react'

const BookingModal = ({ tutor, onClose }) => {
  const [currentStep, setCurrentStep] = useState('datetime') // datetime, summary, payment, confirmation
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const [isProcessing, setIsProcessing] = useState(false)

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isToday = date.toDateString() === today.toDateString()
      const isPast = date < today
      days.push({ day, date, isToday, isPast })
    }
    
    return days
  }

  const formatDate = (date) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
  }

  const handleDateSelect = (dateObj) => {
    if (!dateObj.isPast) {
      setSelectedDate(dateObj.date)
      setSelectedTime(null) // Reset time when date changes
    }
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleContinue = () => {
    if (currentStep === 'datetime' && selectedDate && selectedTime) {
      setCurrentStep('summary')
    } else if (currentStep === 'summary') {
      setCurrentStep('payment')
    }
  }

  const handleConfirmBooking = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep('confirmation')
    }, 3000)
  }

  const renderDateTimeStep = () => (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Escolher Data e Hora</h2>
      
      {/* Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Dezembro 2024</h3>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays().map((dateObj, index) => (
            <button
              key={index}
              onClick={() => dateObj && handleDateSelect(dateObj)}
              disabled={!dateObj || dateObj.isPast}
              className={`
                h-10 text-sm rounded
                ${!dateObj ? 'invisible' : ''}
                ${dateObj?.isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                ${dateObj?.isToday ? 'bg-blue-100 text-blue-600 font-medium' : ''}
                ${selectedDate?.getDate() === dateObj?.day ? 'bg-primary text-white' : 'hover:bg-gray-100'}
                ${!dateObj?.isPast && !selectedDate ? 'text-gray-700' : ''}
              `}
            >
              {dateObj?.day}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">
            Horários Disponíveis - {selectedDate.getDate()} Dez
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {tutor.availability.map(time => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`
                  py-3 px-4 rounded-lg border text-sm font-medium
                  ${selectedTime === time 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Safety Reminder */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-orange-800 mb-1">Primeira sessão?</div>
            <div className="text-orange-700">Escolha local público e seguro</div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selectedDate || !selectedTime}
        className={`w-full py-3 px-4 rounded-lg font-semibold ${
          selectedDate && selectedTime
            ? 'bg-primary text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Continuar 🔜
      </button>
    </div>
  )

  const renderSummaryStep = () => (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmar Reserva</h2>
      
      {/* Tutor Info */}
      <div className="card p-4 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="text-2xl">{tutor.avatar}</div>
          <div>
            <div className="font-semibold">{tutor.name}</div>
            <div className="text-sm text-gray-600">⭐ {tutor.rating} • Matemática</div>
            <div className="text-sm text-secondary">✅ Verificado</div>
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="card p-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <span>{formatDate(selectedDate)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span>{selectedTime} - {(parseInt(selectedTime.split(':')[0]) + 1).toString().padStart(2, '0')}:00 (1h)</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            <span>Biblioteca Municipal</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="card p-4 mb-4">
        <h3 className="font-semibold mb-3">💰 Custo Total</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Aula (1h):</span>
            <span>{tutor.price}MT</span>
          </div>
          <div className="flex justify-between">
            <span>Taxa da plataforma:</span>
            <span>50MT</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total:</span>
            <span>{tutor.price + 50}MT</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="card p-4 mb-4">
        <h3 className="font-semibold mb-3">💳 Forma de Pagamento</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="mpesa"
              checked={paymentMethod === 'mpesa'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <span>M-Pesa</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <span>Dinheiro (na aula)</span>
          </label>
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="card p-4 mb-6 border-orange-200 bg-orange-50">
        <h4 className="font-semibold text-orange-800 mb-2">⚠️ Lembrete de Segurança</h4>
        <div className="text-sm text-orange-700 space-y-1">
          <div>• Encontre-se em local público</div>
          <div>• Partilhe localização com familiar/amigo</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleContinue}
          className="btn-primary w-full"
        >
          Confirmar Reserva ✅
        </button>
        <button
          onClick={() => setCurrentStep('datetime')}
          className="btn-secondary w-full"
        >
          ← Voltar
        </button>
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="p-6">
      {paymentMethod === 'mpesa' ? (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pagamento M-Pesa</h2>
          
          {!isProcessing ? (
            <div>
              <div className="card p-4 mb-6">
                <h3 className="font-semibold mb-3">Instruções de Pagamento</h3>
                <div className="space-y-2 text-sm">
                  <div>1. Marque *150*00#</div>
                  <div>2. Escolha "4 - Pagamentos"</div>
                  <div>3. Insira código: <span className="font-mono font-bold">XPL12345</span></div>
                  <div>4. Valor: <span className="font-bold">{tutor.price + 50}MT</span></div>
                  <div>5. Confirme com PIN</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleConfirmBooking}
                  className="btn-primary w-full"
                >
                  Já Paguei - Confirmar
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className="btn-secondary w-full"
                >
                  Pagar na Aula
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">⏱️</div>
              <h3 className="text-lg font-semibold mb-2">Aguardando confirmação...</h3>
              <p className="text-gray-600 mb-4">🔄 A verificar pagamento</p>
              <div className="animate-pulse text-primary">Processando...</div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={handleConfirmBooking}
            className="btn-primary w-full"
          >
            Confirmar Reserva (Pagar na Aula)
          </button>
        </div>
      )}
    </div>
  )

  const renderConfirmationStep = () => (
    <div className="p-6 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        ✅ Reserva Confirmada!
      </h2>
      <p className="text-gray-600 mb-6">A sua aula foi marcada</p>
      
      <div className="card p-4 mb-6 text-left">
        <div className="space-y-3">
          <div>💰 Pagamento: {paymentMethod === 'mpesa' ? 'M-Pesa confirmado' : `Na aula (${tutor.price + 50}MT)`}</div>
          <div>📞 Contacto: +258 84 xxx xxxx</div>
          <div>📍 Local: Biblioteca Municipal</div>
        </div>
      </div>

      <div className="card p-4 mb-6 text-left">
        <h4 className="font-semibold mb-3">📲 Próximos Passos:</h4>
        <div className="space-y-1 text-sm text-gray-700">
          <div>• Contacte o explicador</div>
          <div>• Confirme o local exato</div>
          {paymentMethod === 'cash' && <div>• Leve dinheiro exacto</div>}
        </div>
      </div>

      <div className="space-y-3">
        <button className="btn-primary w-full">
          Ver Detalhes Completos 📋
        </button>
        <button className="btn-secondary w-full">
          Contactar Explicador 💬
        </button>
        <button 
          onClick={onClose}
          className="w-full py-3 text-gray-600 font-medium"
        >
          Voltar ao Início 🏠
        </button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="font-semibold">
            {currentStep === 'datetime' && 'Escolher Horário'}
            {currentStep === 'summary' && 'Confirmar Detalhes'}
            {currentStep === 'payment' && 'Pagamento'}
            {currentStep === 'confirmation' && 'Sucesso'}
          </h2>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep !== 'confirmation' && (
          <div className="px-4 py-2">
            <div className="flex space-x-2">
              <div className={`h-2 flex-1 rounded ${currentStep === 'datetime' ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className={`h-2 flex-1 rounded ${currentStep === 'summary' ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className={`h-2 flex-1 rounded ${currentStep === 'payment' ? 'bg-primary' : 'bg-gray-200'}`}></div>
            </div>
          </div>
        )}

        {/* Content */}
        {currentStep === 'datetime' && renderDateTimeStep()}
        {currentStep === 'summary' && renderSummaryStep()}
        {currentStep === 'payment' && renderPaymentStep()}
        {currentStep === 'confirmation' && renderConfirmationStep()}
      </div>
    </div>
  )
}

export default BookingModal