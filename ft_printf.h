/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_printf.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/14 22:13:21 by kblack            #+#    #+#             */
/*   Updated: 2018/11/21 00:07:07 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FT_PRINTF_H
# define FT_PRINTF_H

# include <string.h>
# include <stdlib.h>
# include <stdio.h>
# include <unistd.h>
# include <stdarg.h>
# include "libft.h"
# include <stdint.h>
# include <float.h>
# include <limits.h>

# define FLAGS " .#+-0123456789hlL"
# define HEX "0123456789abcdef"
# define HEX_UPPER "0123456789ABCDEF" 
# define OCTAL "01234567" 

/*  
 *  The colon signifies that they are bit-field; tells how many bits each variable
 *  takes up ; and use it to load in a single 32-bit value  
*/

typedef struct pf_float_tokens
{
    int sign;
    char *whole;
    char *wd;
    char *str;
} pf_f;

typedef struct pf_signed_tokens
{
    char sign;
    char neg;
    int num;
} pf_s;

typedef struct pf_unsign_tokens
{
    unsigned int x: 1;
    unsigned int X: 1;
    unsigned int p: 1;
    
    unsigned int h: 1;
    unsigned int hh: 1;
    unsigned int l: 1;
    unsigned int ll: 1;
    unsigned int L: 1; 
} pf_u;

typedef struct pf_flag_tokens
{
    unsigned int hash: 1;
    unsigned int left: 1;
    unsigned int plus: 1;
    unsigned int space: 1;
    unsigned int zero: 1;
    unsigned int dot: 1;
    int width;
    int prec;
} pf_flags;


typedef struct pf_main_tokens
{
    int i;
    int out;
    char ctype;
    pf_flags flag;
    pf_u u;
    pf_s s;
    pf_f f;
} pf_token;

int ft_printf(const char *fmt, ...);

void ascii_handler(const char *fmt, va_list ap, pf_token *pf);
void handle_precision(pf_token *pf, char **int_str);
void print_conversion(const char *fmt, va_list ap, pf_token *pf);
void print_digits(pf_token *pf, char *int_str);
void print_float(va_list ap, pf_token *pf);
void print_hex_digits(pf_token *pf, char *int_str);
void signed_int_handler(const char *fmt, va_list ap, pf_token *pf);
void unsigned_int_handler(const char *fmt, va_list ap, pf_token *pf);

#endif