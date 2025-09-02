import sklearn as sklearn
from sklearn.datasets import load_iris
import numpy as np

iris = load_iris()
y = iris.target

def entropy(labels):

    n_labels = len(labels)
    if n_labels <= 1:
        return 0
    
    value, counts = np.unique(labels, return_counts=True)
    probs = counts / n_labels
    return -np.sum(probs * np.log2(probs))

print ("Entropia do conjunto iris:", entropy(y))