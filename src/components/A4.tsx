interface A4Props {
    multiple?: boolean;
    children: React.ReactNode;
}

function A4({ children, multiple = false }: A4Props) {
    return (
        <div className={`px-4 sm:px-8 py-4 w-full max-w-[210mm] ${multiple ? '' : 'min-h-[297mm]'} bg-white mx-auto flex flex-col print:w-full print:max-w-none print:min-h-0 print:mx-0 print:p-0 print:shadow-none shadow-lg`}>
            {children}
        </div>
    );
}

export default A4;
