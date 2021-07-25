import React from 'react';
import CoursePart from '../types/types';

import Part from '../components/Part';


interface ContentProps {
    courseParts:CoursePart[],
}

const Content = (props:ContentProps) => {
    return (
        <div>
            {props.courseParts.map((item,index)=>{
                return <Part key={index} coursePart={item}/>
            })}
        </div>
    )
}

export default Content
