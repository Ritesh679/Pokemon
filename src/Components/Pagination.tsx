const Pagination = ({
	pagination,
	offset,
}: {
	pagination: Function;
	offset: number;
}) => {
	// console.log(offset);
	const pageNumbers = [];
	const handleButtonClick = (event: any) => {
		pagination(event.target.value);
	};
	return (
		<div className="flex justify-between p-[10px]">
			<button
				onClick={() => handleButtonClick(event)}
				disabled={offset === 0}
				value="prev"
			>
				{offset === 0 ? "" : "Prev"}
			</button>

			<button onClick={() => handleButtonClick(event)} value="next">
				Next
			</button>
		</div>
	);
};

export default Pagination;
