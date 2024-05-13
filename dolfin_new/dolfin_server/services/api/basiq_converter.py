import pandas as pd


class BasiqConverter:
    @staticmethod
    def convert_basiq_transactions_to_dataframe(basiq_transactions):
        transaction_list = basiq_transactions['data']
        transactions = []
        for transaction in transaction_list:
            try:
                transaction_data = {
                    'type': transaction['type'],
                    'id': transaction['id'],
                    'status': transaction['status'],
                    'description': transaction['description'],
                    'amount': pd.to_numeric(transaction['amount'], errors='coerce'),
                    'account': transaction['account'],
                    'balance': transaction['balance'],
                    'direction': transaction['direction'],
                    'class': transaction['class'],
                    'institution': transaction['institution'],
                    'postDate': transaction['postDate'],
                    'subClass_title': transaction['subClass']['title'] if transaction.get('subClass') else None,
                    'subClass_code': transaction['subClass']['code'] if transaction.get('subClass') else None
                }
                transactions.append(transaction_data)
            except KeyError as e:
                print(f"Skipping transaction: {e}")
        return pd.DataFrame(transactions)
