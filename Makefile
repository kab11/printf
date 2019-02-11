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

NAME	=	libftprintf.a

CC		=	gcc
CFLAGS	=	-Wall -Wextra -Werror

SRC		=	char_handler.c \
			ft_printf.c \
			handle_precision.c \
			print_conversion.c \
			print_digits.c \
			print_float.c \
			print_hex_digits.c \
			signed_int_handler.c \
			unsigned_int_handler.c 


INC_FT	=	-I libft
LINK_FT	=	-L libft -l ft
FT		=	$(INC_FT) $(LINK_FT)

HDR = libftprintf.h
OFL = $(SRC:.c=.o)

all: $(NAME)

$(NAME): $(OFL)
	make -C libft
	# $(CC) -o $@ $(CFLAGS) $(FT) $(OFL) -I .
	cp libft/libft.a ./$(NAME)
	ar rc $(NAME) $(OFL)
	ranlib $(NAME)

$(OFL): $(SRC)
	@$(CC) $(CFLAGS) $(INC_FT) -I . -c $(SRC)

clean:
	rm -rf $(OFL)
	# make -C libft clean
	make clean -C libft

fclean: clean
	rm -rf $(NAME)
	# make -C libft fclean
	make fclean -C libft

re: fclean all
	make -C libft re

# test:
	# gcc -Wall -Werror -Wextra main.c -I . -I libft libftprintf.a