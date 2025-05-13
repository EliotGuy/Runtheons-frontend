import Link from 'next/link'
import { FooterType } from '@/types/sanity'

export default function Footer({ data }: { data: FooterType }) {
  return (
    <footer className='border-t mt-24'>
      <div className="px-6 md:px-20 lg:px-[139px] py-8 md:py-[50.5px] text-white">
        <div className='flex flex-col text-base space-y-4 md:space-y-0'>
          <h1 className='font-semibold text-center md:text-left'>Runtheons</h1>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left space-y-4 md:space-y-0'>
            <p className='max-w-full md:max-w-[1060px] text-sm md:text-base'>
              Copyright © Runtheons S.R.L. | Via Desenzano 1, 25087, Salò, Italy | VAT, tax code, and number of registration with the Brescia Company Register 04517900983
            </p>
            <Link href={data?.privacyPolicy} className='font-semibold text-sm md:text-base underline md:no-underline'>
              Privacy and cookie policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
