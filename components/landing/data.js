import { FiBox, FiCalendar, FiCamera, FiCode, FiFeather, FiImage, FiMessageSquare, FiMusic, FiStar, FiUsers, FiBriefcase } from 'react-icons/fi'
import { FaGamepad } from 'react-icons/fa'

export const categories = [
  { label: 'Designers', icon: FiBox },
  { label: 'Developers', icon: FiCode },
  { label: 'Writers', icon: FiFeather },
  { label: 'Musicians', icon: FiMusic },
  { label: 'Photographers', icon: FiCamera },
  { label: 'Gamers', icon: FaGamepad },
]

export const features = [
  { icon: FiImage, tint: '#f6c9a6', title: 'Share your work', text: 'Showcase your projects, art, ideas and more.' },
  { icon: FiUsers, tint: '#f4b4b0', title: 'Communities', text: 'Join niche groups and find your people.' },
  { icon: FiBriefcase, tint: '#f6b98f', title: 'Gigs & Opportunities', text: 'Get freelance work, collaborations and more.' },
  { icon: FiMessageSquare, tint: '#c9bdf0', title: 'Real-time Chat', text: 'Connect with creators directly.' },
  { icon: FiCalendar, tint: '#b6d4f2', title: 'Events & Workshops', text: 'Attend and host creative events.' },
  { icon: FiStar, tint: '#f7d98a', title: 'Level Up', text: 'Earn XP, unlock badges and grow your profile.' },
]

export const stats = [
  { value: '10K+', label: 'Creators' },
  { value: '250+', label: 'Communities' },
  { value: '5K+', label: 'Projects Shared' },
  { value: '1K+', label: 'Gigs Posted' },
]

export const communities = [
  { name: 'Design Circle', members: '1.2K', emoji: '🎨', from: '#6b3a1e' },
  { name: 'Dev Collective', members: '2.4K', emoji: '💻', from: '#1f4a6b' },
  { name: 'Creative Writers', members: '980', emoji: '✍️', from: '#7a4a2a' },
  { name: 'Game Creators', members: '1.1K', emoji: '🎮', from: '#5a2a6b' },
]

export const plans = [
  { name: 'Free', price: 0, cta: 'Get Started', perks: ['Create profile', 'Join communities', 'Basic messaging', 'Access to public gigs'] },
  { name: 'Pro', price: 199, cta: 'Start Pro', popular: true, perks: ['Everything in Free', 'Unlimited messaging', 'Post unlimited projects', 'Apply to premium gigs', 'Advanced analytics'] },
  { name: 'Creator+', price: 499, cta: 'Start Creator+', perks: ['Everything in Pro', 'Featured profile', 'Early access to events', 'Priority support', 'Custom profile link'] },
]

export const gigs = [
  { role: 'React Developer', pay: '$500 - $1,000', tags: 'React · Next.js' },
  { role: 'Brand Designer', pay: '$300 - $500', tags: 'Figma · Branding' },
  { role: 'Illustrator', pay: '$200 - $500', tags: 'Illustration · Art' },
]

export const stories = [
  { name: 'Aria Beats', role: 'Music Producer', quote: 'ZURA helped me find amazing collaborators for my music projects. The community here is so supportive.' },
  { name: 'CodeFerret', role: 'Full Stack Developer', quote: 'I got my first freelance client through ZURA. The platform is simple and super useful.' },
  { name: 'PixelNoir', role: 'Digital Artist', quote: 'The best place to meet like-minded creatives. The events and discussions are always inspiring.' },
]

export const faqs = [
  { q: 'What is ZURA?', a: 'ZURA is a creative community platform where creators, builders and dreamers share work, learn together and find opportunities.' },
  { q: 'Is ZURA free to use?', a: 'Yes. The Free plan lets you create a profile, join communities and apply to public gigs. Upgrade whenever you need more.' },
  { q: 'Can I post my projects?', a: 'Absolutely. Free accounts can post projects, and Pro unlocks unlimited posts and advanced analytics.' },
  { q: 'How do I find gigs?', a: 'Open the Gigs tab to browse remote, on-site and freelance work, then apply directly from your profile.' },
  { q: 'Can I create a community?', a: 'Yes. Start a community around any interest, invite members and host events and workshops.' },
]
