

export const paths = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: "images/svgs/grid.svg", //<Icon icon="tabler:home" width="30" />
    },
    {
      name: "Wallet",
      icon: "/images/png/wallet.png", //<Icon icon="gis:car" width="30" />
      link: "/dashboard/fund-wallet",
      // children: [
      //   {
      //     title: "Fund Wallet",
      //     link: "/dashboard/fund-wallet",
      //   },
      //   {
      //     title: "Share Wallet Fund",
      //     link: "/dashboard/share-funds",
      //   },
      //   {
      //     title: "Commission",
      //     link: "/dashboard/wallet-commission",
      //   },
      // ],
    },
    {
      name: "Services",
      link: "/",
      icon: "/images/png/services.png", //<Icon icon="uil:wallet" width="30" />
      children: [
        {
          title: "Buy Airtime",
          link: "/dashboard/buy-airtime",
        },
        {
          title: "Buy Data",
          link: "/dashboard/buy-data",
        },
        {
          title: "Cable TV",
          link: "/dashboard/buy-cable",
        },
        {
          title: "Pay Electricity",
          link: "/dashboard/buy-electricity",
        },
        {
          title: "BroadBand Internet",
          link: "/dashboard/buy-internet",
        },
        {
          title: "Result Checker",
          link: "/dashboard/check-result",
        },
        {
          title: "Betting",
          link: "/dashboard/betting",
        },
      ],
    },
    {
      name: "Transaction History",
      link: "/dashboard/transactionhist",
      icon: "/images/png/transaction.png", //<Icon icon="codicon:account" width="30" />
    },
    {
      name: "Settings",
      link: "/dashboard/profile",
      icon: "/images/png/settings.png", //<Icon icon="codicon:account" width="30" />
    },
    {
      name: "Referral",
      link: "/dashboard/referral",
      icon: "/images/png/ref.png", //<Icon icon="codicon:account" width="30" />
    },
  ];
