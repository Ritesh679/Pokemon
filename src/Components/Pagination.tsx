const Pagination = ({
	pagination,
	offset,
}: {
	pagination: Function;
	offset: number;
}) => {
	const handleButtonClick = (value: string) => {
		pagination(value);
	};
	return (
		<div className="flex justify-between p-[10px]">
			<button onClick={() => handleButtonClick("prev")} disabled={offset === 0}>
				{offset === 0 ? "" : "Prev"}
			</button>

			<button onClick={() => handleButtonClick("next")}>Next</button>
		</div>
	);
};

export default Pagination;
