export const findUserByUsername = async (username: string) => {
  /*   const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user; */
  return Promise.resolve({
    id: 0,
    username,
    password: "password",
  });
};

export const findUserById = async (id: number) => {
  /*   const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return user; */
  return Promise.resolve({
    id,
    username: "username",
    password: "password",
  });
};
