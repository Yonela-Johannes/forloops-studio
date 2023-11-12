import React from 'react'
import Information from './about/About'
import About from './About'
import FooterMain from './shared/FooterMain'

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-cl w-full mx-auto h-full">
      <Information />
      <About />
      <div className="mt-20">
        <FooterMain />
      </div>
    </div>
  )
}

export default AboutPage
