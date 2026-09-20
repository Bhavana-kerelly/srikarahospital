import { useState } from 'react'
import { Share2, Link as LinkIcon, Check, MessageCircle, Twitter, Linkedin, Facebook } from 'lucide-react'

export function ShareBar({ title, url }) {
  const [copied, setCopied] = useState(false)
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (e) {
      console.error(e)
    }
  }

  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title || 'Srikara Hospitals Health Article')

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 text-xs">
      <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mr-2">
        <Share2 size={14} className="text-[#8B1A4A]" />
        <span>Share:</span>
      </span>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
        title="Copy article link"
      >
        {copied ? <Check size={13} className="text-emerald-600" /> : <LinkIcon size={13} />}
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold transition-colors"
        title="Share on WhatsApp"
      >
        <MessageCircle size={13} />
        <span>WhatsApp</span>
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
        title="Share on X"
      >
        <Twitter size={13} />
        <span>X</span>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin size={13} />
        <span>LinkedIn</span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold transition-colors"
        title="Share on Facebook"
      >
        <Facebook size={13} />
        <span>Facebook</span>
      </a>
    </div>
  )
}
export default ShareBar
