import numpy as np


# operations to be performed by the calculator


def math_add(A,B):
    return np.add(A,B)

def math_sub(A,B):
    return np.subtract(A,B)

def math_multi(A,B):
    return np.dot(A,B)

def math_transpose(A):
    return A.T

def matrix_determinant(A):
    return np.linalg.det(A)

def matrix_inverse(A):
    return np.linalg.inv(A)

def matrix_eigen(A):
    eigenvalues, eigenvectors = np.linalg.eig(A)
    return eigenvalues, eigenvectors

def solve_linear_equations(A, B):
    return np.linalg.solve(A, B)

#front end showcase of the calculator

def display_menu():
    print("\nMatrix Operations Calculator")
    print("1. Matrix Addition")
    print("2. Matrix Subtraction")
    print("3. Matrix Multiplication")
    print("4. Matrix Transpose")
    print("5. Matrix Determinant")
    print("6. Matrix Inverse")
    print("7. Eigenvalues and Eigenvectors")
    print("8. Solve Linear Equations")
    print("9. Exit")

def get_matrix_input(prompt):
    # Get matrix dimensions
    rows = int(input("Enter the number of rows for " + prompt + ": "))
    cols = int(input("Enter the number of columns for " + prompt + ": "))

    # Get matrix elements
    print("Enter the elements of the " + prompt + " matrix (row-wise, separated by spaces):")

    """ 
 input(): Takes user input as a string. For example, if the user enters 1 2 3, input() returns the string "1 2 3".

.split(): Splits the input string into a list of substrings based on spaces. For example, "1 2 3".split() returns ["1", "2", "3"].

map(float, ...): Applies the float() function to each element in the list. For example, map(float, ["1", "2", "3"]) converts the list to [1.0, 2.0, 3.0].

list(map(...)): Converts the result of map() into a list. For example, list(map(float, ["1", "2", "3"])) gives [1.0, 2.0, 3.0].
    """
    matrix = [list(map(float, input().split())) for _ in range(rows)]
    return np.array(matrix)

def main():
    while True:
        display_menu()
        choice = input("Enter your choice (1-9): ")

        if choice == '1':
            A = get_matrix_input("A")
            B = get_matrix_input("B")
            print("Result of Matrix Addition:\n", np.add(A, B))

        elif choice == '2':
            A = get_matrix_input("A")
            B = get_matrix_input("B")
            print("Result of Matrix Subtraction:\n", np.subtract(A, B))

        elif choice == '3':
            A = get_matrix_input("A")
            B = get_matrix_input("B")
            print("Result of Matrix Multiplication:\n", np.dot(A, B))

        elif choice == '4':
            A = get_matrix_input("A")
            print("Result of Matrix Transpose:\n", A.T)

        elif choice == '5':
            A = get_matrix_input("A")
            print("Determinant of Matrix A:", np.linalg.det(A))

        elif choice == '6':
            A = get_matrix_input("A")
            print("Inverse of Matrix A:\n", np.linalg.inv(A))

        elif choice == '7':
            A = get_matrix_input("A")
            eigenvalues, eigenvectors = np.linalg.eig(A)
            print("Eigenvalues:\n", eigenvalues)
            print("Eigenvectors:\n", eigenvectors)

        elif choice == '8':
            A = get_matrix_input("A")
            B = get_matrix_input("B")
            print("Solution to Ax = B:", np.linalg.solve(A, B))

        elif choice == '9':
            print("Exiting the calculator. Goodbye!")
            break

        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()