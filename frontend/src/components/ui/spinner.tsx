import { Loader2 } from 'lucide-react';

const Spinner = () => {
	return (
		<div className="flex h-150 w-full items-center justify-center">
			<Loader2 className="size-18 animate-spin" />
		</div>
	);
};

export default Spinner;
