import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

function Loading() {
  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center ">
      <div className="flex flex-col relative w-full max-w-sm aspect-auto p-6 drop-shadow rounded-md items-center">
        <div className="relative w-[20%] aspect-square mx-auto mb-12">
          <Image
            src="/favicon (1).svg"
            layout="fill"
            objectFit="cover"
            alt="Favicon"
          />
        </div>
        <TailSpin
          height="50"
          width="50"
          color="#6000ff"
          ariaLabel="tail-spin-loading"
          radius="2"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
}

export default Loading;
