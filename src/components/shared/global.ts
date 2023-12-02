export const titlizeText = (str: string) => {
  let textArr = [];
  let newText = "";
  str = str.toString();
  if (str) {
    textArr = str.split(" ");
    textArr = textArr.map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    });
    newText = textArr.join(" ");
  } else {
    newText = "";
  }
  return newText;
};


export const hasNumber = (str: string) => {
  return /^.*[0-9].*$/.test(str);
};

export const hasSymbol = (str: string) => {
  return /^.*([-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+).*$/.test(str);
};

export const isPassLong = (str: string) => {
  return /^[A-Za-z]*(?=.*[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])(?=.*[0-9]).{8,}$/.test(
    str
  );
};
