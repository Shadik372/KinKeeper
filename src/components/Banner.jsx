const Banner = () => {
  const summaryData = [
    { number: '10', label: 'Total Friends' },
    { number: '3', label: 'On Track' },
    { number: '6', label: 'Need Attention' },
    { number: '12', label: 'Interactions This Month' },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center w-full px-4">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e293b] mb-3 md:mb-4 tracking-tight leading-tight">
        Friends to keep close in your life
      </h1>
      <p className="text-gray-500 max-w-xl md:max-w-2xl mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
      </p>

      <button className="bg-[#1A4731] hover:bg-[#153423] text-white transition-colors rounded-md px-5 md:px-6 py-2.5 shadow-sm mb-10 md:mb-16 font-medium text-sm flex items-center gap-2">
        <span className="text-lg">+</span> Add a Friend
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-5xl">
        {summaryData.map((data, index) => (
          <div
            key={index}
            className="bg-white p-5 md:p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center"
          >
            <span className="text-2xl md:text-3xl font-bold text-[#1A4731] mb-1 md:mb-2">{data.number}</span>
            <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-medium">{data.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Banner;
