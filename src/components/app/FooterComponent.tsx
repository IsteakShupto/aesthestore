export default function FooterComponent() {
  return (
    <>
      <footer className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h4 className="text-xl mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <a href="#">Shop All</a>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
              <li>
                <a href="#">Best Sellers</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Shipping & Returns</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-4">Newsletter</h4>
            <p className="mb-4">Get updates on aesthetic finds and trends.</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded focus:outline-none border"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
