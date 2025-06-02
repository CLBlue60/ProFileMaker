import { useForm, ValidationError } from '@formspree/react';

export default function Inquiry() {
  const [state, handleSubmit] = useForm("xvgrplkw");

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-base-dark rounded-xl shadow-md p-8 max-w-lg w-full border border-accent/20">
        <h1 className="text-3xl font-bold text-accent mb-4 text-center">Contact Us</h1>
        <p className="text-text/80 dark:text-text-dark/80 mb-6 text-center">
          Have a question, want a custom template, or need enterprise solutions? Fill out the form below and we’ll get back to you!
        </p>
        {state.succeeded ? (
          <div className="text-green-600 text-center font-semibold">Thank you! Your inquiry has been sent.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-primary" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div>
              <label className="block mb-1 font-medium text-primary" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div>
              <label className="block mb-1 font-medium text-primary" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg transition"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
