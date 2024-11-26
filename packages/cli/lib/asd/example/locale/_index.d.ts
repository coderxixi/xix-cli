declare const add: (lang: string, message: Partial<import("@varlet/ui").Message> & {
    lang?: string;
}) => void, t: (id: string, options?: {
    locale?: string;
}) => string, merge: (lang: string, message: Partial<import("@varlet/ui").Message>) => void;
declare const use: (lang: string) => void;
export { add, t, merge, use };
