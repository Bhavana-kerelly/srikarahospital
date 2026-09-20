export const SRIKARA_WHATSAPP_NUMBER = '919247958308'

/**
 * Returns a pre-filled WhatsApp click-to-chat URL for Srikara Hospitals bookings.
 */
export function getWhatsAppBookingUrl({ doctor, doctorName, specialty, branch, message, patientPhone } = {}) {
  if (message) {
    return `https://wa.me/${SRIKARA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  let text = 'Hello Srikara Hospitals, I would like to book an appointment'

  const doc = doctor || (doctorName ? { name: doctorName, specialty, branch } : null)

  if (doc?.name) {
    const cleanName = doc.name.startsWith('Dr.') ? doc.name : `Dr. ${doc.name}`
    text += ` with ${cleanName}`
    if (doc.specialty) {
      text += ` (${doc.specialty})`
    }
    if (doc.branch) {
      text += ` at the ${doc.branch} branch`
    }
  } else {
    if (specialty) {
      text += ` for ${specialty}`
    }
    if (branch) {
      const branchTitle = typeof branch === 'object' ? branch.title || branch.name : branch
      text += ` at the ${branchTitle} branch`
    }
  }

  if (patientPhone) {
    text += ` (Phone: ${patientPhone})`
  }

  text += '.'

  return `https://wa.me/${SRIKARA_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/**
 * Opens WhatsApp booking with pre-filled message in a new tab.
 */
export function openWhatsAppBooking(options = {}) {
  const url = getWhatsAppBookingUrl(options)
  window.open(url, '_blank', 'noopener,noreferrer')
}
