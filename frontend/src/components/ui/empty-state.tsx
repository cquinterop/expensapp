import { HandCoins } from 'lucide-react';

const EmptyState = () => {
	return (
		<div
			className="flex h-[50vh] flex-col items-center justify-center gap-6"
			data-testid="empty-state"
		>
			<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
				<HandCoins className="h-10 w-10 text-gray-500 dark:text-gray-400" />
			</div>
			<div className="space-y-2 text-center">
				<h2 className="text-2xl font-bold tracking-tight">Items not found</h2>
				<p className="text-gray-500 dark:text-gray-400">
					Add a new one!
				</p>
			</div>
		</div>
	);
};

export default EmptyState;
