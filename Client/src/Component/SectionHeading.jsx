import React from 'react';

const SectionHeading = ({Heading, subHeading}) => {
    return (
        <div className="text-center w-4/12 mx-auto mb-12">
            <h3 className="text-yellow-400 italic text-base pb-3">{subHeading}</h3>
            <div className="border-y border-gray-400">
                <p className="text-4xl uppercase py-3">{Heading}</p>
            </div>
        </div>
    );
};

export default SectionHeading;