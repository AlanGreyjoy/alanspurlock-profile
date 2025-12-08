export function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] py-20 px-4 gap-6">
      <a
        href="mailto:alanspurlock@hotmail.com"
        className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#00d1b2] hover:underline transition-all whitespace-nowrap text-center"
      >
        alanspurlock@hotmail.com
      </a>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium text-center px-4">
        You bring the vision, I bring the code.
      </p>
    </div>
  );
}

export default ContactPage;
