export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-semibold text-ink">Pixel Bee</p>
          <p className="mt-1 text-sm text-black/50">
            გრაფიკული დიზაინი და ბრენდინგი
          </p>
        </div>

        <p className="text-sm text-black/50">
          © {year} Pixel Bee. ყველა უფლება დაცულია.
        </p>
      </div>
    </footer>
  );
}

