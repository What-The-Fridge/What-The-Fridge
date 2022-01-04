import { createContext, useContext, useState } from 'react';

type UserBasicInfo = {
	id: number;
	firebaseUserUID: string;
	firstName: string;
	lastName: string;
	tier: number;
	email: string;
	imgUrl?: string | null | undefined;
	createdAt: string;
};

type AppContextType = [
	UserBasicInfo,
	React.Dispatch<React.SetStateAction<UserBasicInfo>>
];

export const AppContext = createContext<AppContextType>([
	{} as UserBasicInfo,
	() => null,
]);

export const AppWrapper = (props: any) => {
	const [sharedState, setSharedState] = useState<UserBasicInfo>({
		createdAt: '',
		email: '',
		firebaseUserUID: '',
		firstName: '',
		id: 0,
		imgUrl: '',
		lastName: '',
		tier: 0,
	});

	return (
		<AppContext.Provider value={[sharedState, setSharedState]}>
			{props.children}
		</AppContext.Provider>
	);
};

export function useAppContext() {
	return useContext(AppContext);
}
