
import { Footer } from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

const FooterMain = () => {
  return (
    <Footer className='bg-black'>
      <div className="w-full px-4 lg:px-24">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Company" />
            <Footer.LinkGroup col>
              <Footer.Link href="/about">
                About
              </Footer.Link>
              <Footer.Link href="/blogs">
                Brand Center
              </Footer.Link>
              <Footer.Link href="/blogs">
                Blog
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="help center" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">
                Facebook
              </Footer.Link>
              <Footer.Link href="#">
                WhatsApp
              </Footer.Link>
              <Footer.Link href="#">
                Contact Us
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">
                Privacy Policy
              </Footer.Link>
              <Footer.Link href="#">
                Licensing
              </Footer.Link>
              <Footer.Link href="#">
                Terms & Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="download" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">
                iOS
              </Footer.Link>
              <Footer.Link href="#">
                Android
              </Footer.Link>
              <Footer.Link href="#">
                Windows
              </Footer.Link>
              <Footer.Link href="#">
                MacOS
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Fl Studio"
            href="#"
            year={2023}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterMain;
