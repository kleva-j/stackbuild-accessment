export default function Footer() {
  return (
    <div className="w-full border-t-[0.5px] border-slate-300 py-5 text-center dark:border-slate-600">
      <p className="text-xs text-gray-500">
        A project by{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://michaelobasi.dev/portfolio_v3/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Michael Obasi
        </a>
      </p>
    </div>
  );
}
