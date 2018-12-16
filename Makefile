# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: kblack <marvin@42.fr>                      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2018/11/14 20:26:15 by kblack            #+#    #+#              #
#    Updated: 2018/11/21 00:02:09 by kblack           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME	=	ft_printf

CC		=	gcc
CFLAGS	=	-Wall -Wextra -Werror

SRC		=	ft_printf.c \
			parse.c \
			print_chars.c \
			print_signed_int.c \
			print_unsigned_int.c 

INC_FT	=	-I libft
LINK_FT	=	-L libft -l ft
FT		=	$(INC_FT) $(LINK_FT)

HDR = libftprintf.h
OFL = $(SRC:.c=.o)

all: $(NAME)

$(NAME): $(OFL)
	make -C libft
	$(CC) -o $@ $(CFLAGS) $(FT) $(OFL) -I .

$(OFL): $(SRC)
	@$(CC) $(CFLAGS) $(INC_FT) -I . -c $(SRC)

clean:
	rm -rf $(OFL)
	make -C libft clean

fclean: clean
	rm -rf $(NAME)
	make -C libft fclean

re: fclean all
	make -C libft re