export function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-4">
      <a
        href="mailto:alanspurlock@hotmail.com"
        className="text-4xl md:text-5xl font-bold text-[#00d1b2] hover:underline transition-all"
      >
        alanspurlock@hotmail.com
      </a>
      <p className="text-xl md:text-2xl text-gray-600 font-medium">
        You bring the vision, I bring the code.
      </p>
    </div>
  );
}

export default ContactPage;
