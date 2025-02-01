import React from "react";

const ErrorTag = ({ desc }: { desc: string }) => {
	return (
		<div className="flex space-x-3 items-center mb-4">
			<img src="/images/svgs/green.svg" alt="" />
			<span className="text-[10px] font-[700] font-[inter]">{desc}</span>
		</div>
	);
};

export default ErrorTag;
