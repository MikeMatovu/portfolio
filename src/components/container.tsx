// export default function Container({ children, rest }) {
//   return (
//     <div className={` w-full mx-auto md:w-[80%] `} {...rest}>
//       {children}
//     </div>
//   );
// }

export default function Container({ children}: { children: React.ReactNode}) {
    return (
        <div className={` w-full mx-auto md:w-[80%] `}>
        {children}
        </div>
    );
}
