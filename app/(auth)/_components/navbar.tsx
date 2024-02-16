import { SiteIcon } from "@/public";
import Image from "next/image";
import Link from "next/link";

export const Navbar = ({
  desc,
  btnText,
  pushTo,
}: {
  desc: string;
  btnText: string;
  pushTo: string;
}) => {
  return (
    <div className='flex w-full justify-between items-center gap-4'>
      <div className='w-8'>
        <Link
          href={"/"}
          shallow
          aria-label='home'>
          <Image
            alt='primary_icon'
            src={SiteIcon}
            blurDataURL={SiteIcon.blurDataURL}
            width={24}
            height={24}
            className='w-auto h-auto'
            priority
          />
        </Link>
      </div>
      <div className='flex w-full justify-end'>
        <div className='text-base xl:text-lg text-gray-900 dark:text-white'>
          <span className='leading-7 [&:not(:first-child)]:mt-6 text-center'>
            {desc}{" "}
          </span>
          <a
            href={pushTo}
            aria-label={pushTo?.replace("/", "-")}>
            <span className='leading-7 [&:not(:first-child)]:mt-6 text-center underline'>
              {btnText}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
