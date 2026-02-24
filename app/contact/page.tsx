'use client'

import Link from "next/link"
import { useState, FormEvent } from "react"

export default function ContactPage() {
	const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		setFormStatus('sending')

		const formData = new FormData(form)
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message'),
		}

		try {
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), 10000)

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
				signal: controller.signal,
			})

			clearTimeout(timeoutId)

			if (response.ok) {
				setFormStatus('success')
				form.reset()
				setTimeout(() => setFormStatus('idle'), 5000)
			} else {
				setFormStatus('error')
				setTimeout(() => setFormStatus('idle'), 5000)
			}
		} catch (error) {
			console.error('API error:', error)
			setFormStatus('error')
			setTimeout(() => setFormStatus('idle'), 5000)
		}
	}

	return (
		<main className="max-w-4xl mx-auto px-6 py-16">
			<Link
				href="/"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
			>
				<span>←</span>
				<span>Back</span>
			</Link>

			<h1 className="text-2xl font-medium mb-8">Contact Me</h1>

			<form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
				<div>
					<label htmlFor="name" className="block mb-2 text-sm">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="w-full px-4 py-2 border border-input bg-background rounded focus:outline-none focus:ring-2 focus:ring-ring transition"
						required
						disabled={formStatus === 'sending'}
					/>
				</div>

				<div>
					<label htmlFor="email" className="block mb-2 text-sm">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						className="w-full px-4 py-2 border border-input bg-background rounded focus:outline-none focus:ring-2 focus:ring-ring transition"
						required
						disabled={formStatus === 'sending'}
					/>
				</div>

				<div>
					<label htmlFor="message" className="block mb-2 text-sm">
						Message
					</label>
					<textarea
						id="message"
						name="message"
						rows={6}
						className="w-full px-4 py-2 border border-input bg-background rounded focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
						required
						disabled={formStatus === 'sending'}
					></textarea>
				</div>

				<button
					type="submit"
					disabled={formStatus === 'sending'}
					className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{formStatus === 'sending' ? 'Sending...' : 'Send'}
				</button>

				{formStatus === 'success' && (
					<p className="text-sm text-green-600">Message sent successfully!</p>
				)}
				{formStatus === 'error' && (
					<p className="text-sm text-red-600">Failed to send message. Please try again.</p>
				)}
			</form>
		</main>
	)
}
