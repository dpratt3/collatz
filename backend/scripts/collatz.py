# import sys
# import argparse

def collatz(num):
    values = [num]
   
    while num > 1:
        if num % 2 == 0:
            num = num // 2 # Force integer div. for very large num
        else:
            num = 3 * num + 1
        values.append(num)
   
    return values

# def main():
#     parser = argparse.ArgumentParser(description='Calculate Collatz Conjecture')
#     parser.add_argument('number', type=int, help='The starting number for the Collatz Conjecture')

#     args = parser.parse_args()
    
#     sequence = collatz(args.number)

#     print("Length:", len(sequence))
    
#     return sequence

# if __name__ == "__main__":
#     main()
