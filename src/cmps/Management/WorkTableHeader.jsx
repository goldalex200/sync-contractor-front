import { useEffect, useState } from "react"

export const WorkTableHeader = ({header, isManager}) => {
    const[style, setStyle] = useState();

    useEffect(() => {
        setStyle({
            width: (header.field === 'ranking' && !isManager) ? 0 :header.width + 'px',
            height: '50px',
            gridColumn: header.column
        })
        console.log("is ,manager??", isManager);
        
    },[header])


    const setheaderName = () =>{
        if(header.field === 'ranking' && !isManager )
            return '';
        if(header.field === 'userPhone' || header.field === 'userName')
            return `${header.headerName}  ${isManager ? ' מנהל' : 'קבלן'}`;
        return header.headerName;
    }

    return <h4 
    className="header-style" 
    style={style}
    >{setheaderName(header.headerName)}</h4>
}