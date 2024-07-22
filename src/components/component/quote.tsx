export function Quote() {
  return (
    <section data-aos="zoom-in" className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Favorite Quote
          </h2>
          <blockquote className="mt-8 border-l-4 border-primary pl-6 italic text-xl text-primary-foreground">
            &ldquo;The people who are crazy enough to think they can change the
            world are the ones who do&ldquo;
          </blockquote>
          <p className="mt-4 text-muted-foreground">
            - Steve Jobs, Co-founder of Apple
          </p>
        </div>
      </div>
    </section>
  );
}
