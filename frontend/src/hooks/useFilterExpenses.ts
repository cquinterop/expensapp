import { useQueryState } from 'nuqs';

const serializeQuery = (filters: Record<string, string>) =>
	Object.entries(filters)
		.reduce((acc, [key, value]) => `${key}:${value} ${acc}`, '')
		.trim();

export const useFilterExpenses = () => {
	const [title, setTitle] = useQueryState('title');
	const [body, setBody] = useQueryState('body');
	const [state, setState] = useQueryState('state');

	const filters = {
		is: 'issue',
		archived: 'false',
		repo: 'facebook/react',
		sort: 'created-desc',
		...(state && { state: state }),
		...(title && { 'in:title': ` ${title}` }),
		...(body && { 'in:body': ` ${body}` }),
	};

	return {
		query: serializeQuery(filters),
		title,
		body,
		state,
		setTitle,
		setBody,
		setState,
	};
};
