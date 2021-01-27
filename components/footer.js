export const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="max-w-screen-lg mx-auto border-none px-4">
        <section
          className="flex flex-col md:flex-row md:justify-between md:border-solid md:border-t text-gray-700 font-light text-sm pt-4 pb-6 md:pt-5 md:pb-6 w-full"
        >
          <div>
            <p className="leading-8 tracking-wide">
              &copy; Lorem Ipsum
            </p>
          </div>
          <div>
            <p className="leading-8 tracking-wide">About Us</p>
            <p className="leading-8 tracking-wide">Privacy Policy</p>
            <p className="leading-8 tracking-wide">Sitemap</p>
          </div>
        </section>
      </div>
    </footer>
  )
}