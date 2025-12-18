"use client";

export default function Footer() {
  return (
    <footer className="flex flex-col bg-gray-50 text-gray-600 py-6 mt-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-center md:text-left mb-4">
            <h1 className="text-[#2C3E50] font-serif font-bold text-lg flex items-center justify-center md:justify-start">
              <span className="text-xl mr-2">©</span> 
              <span>2025 FATIMA: A Call To Salvation</span>
            </h1>
            <p className="text-gray-500 text-sm italic mt-1 font-serif">
              Not A Promise Of Peace, But A Remedy For Souls
            </p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-5 w-full">
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-center md:text-left">
                <span className="font-bold text-gray-700">Legal Notice:</span> 
                {" "}This work is shared freely in the hope that it may be read with sincerity, and passed on with care.
                All content is presented faithfully without alteration or reinterpretation.
              </p>
              
              <p className="text-sm leading-relaxed text-center md:text-left">
                Those who wish to discuss, publish, or reference this material may contact:{" "}
                <a 
                  href="mailto:mickken@hotmail.com" 
                  className="text-[#2C3E50] hover:text-[#8B7355] transition-colors duration-200"
                >
                  mickken@hotmail.com
                </a>
              </p>
              
              <div className="text-center md:text-left pt-2">
                <p className="text-sm font-serif italic text-gray-500">
                  In the Twin Equal Hearts of Jesus and Mary...
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-400 text-center w-full">
            <p>A site dedicated to preserving the original testimony of Fatima</p>
          </div>
        </div>
      </div>
    </footer>
  ); 
}