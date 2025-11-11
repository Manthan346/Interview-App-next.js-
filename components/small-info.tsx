function SmallInfo() {
  return (
    <section className="bg-foreground text-background py-12 sm:py-16 mt-10 w-full">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <h4 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
          How it Works
        </h4>

        {/* Ordered List */}
        <ol className=" list-decimal pl-6 sm:pl-10 text-left space-y-5 text-2xl sm:text-lg leading-relaxed text-background/90">
          <li>Book mock interviews whenever you like.</li>
          <li>
            Meet with your interviewer — a senior engineer from FAANG and other
            top companies — for virtual, fully anonymous sessions.
          </li>
          <li>
            Get detailed, actionable feedback about exactly what you need to
            work on to land the job you deserve.
          </li>
        </ol>
      </div>
    </section>
  );
}

export default SmallInfo;
